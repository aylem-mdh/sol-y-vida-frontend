import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import FamilyMembersTable from "../components/dashboard/FamilyMembersTable";
import FamilyMemberForm from "../components/dashboard/FamilyMemberForm";
import Modal from "../components/ui/Modal";

import {
  getFamilyMembers,
  deleteFamilyMember,
  type FamilyMember,
} from "../services/familyMemberService";

export default function FamilyMembers() {
  const { t } = useTranslation();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [selectedMember, setSelectedMember] =
    useState<FamilyMember | null>(null);

  const loadFamilyMembers = useCallback(async () => {
    setLoadError("");
    try {
      const data = await getFamilyMembers();
      setFamilyMembers(data);
    } catch (error) {
      setLoadError(t("crud.errors.loadList"));
      throw error;
    }
  }, [t]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadFamilyMembers().catch(() => undefined); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadFamilyMembers]);

  async function removeMember(id: number) {
    if (!window.confirm(t("crud.confirmDeleteFamilyMember")))
      return;

    try {
      await deleteFamilyMember(id);

      setFamilyMembers((prev) =>
        prev.filter((m) => m.id !== id)
      );
    } catch (error) {
      alert(axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message ?? t("crud.errors.deleteFamilyMember")
        : t("crud.errors.deleteFamilyMember"));
    }
  }

  function newMember() {
    setSelectedMember(null);
    setShowModal(true);
  }

  function editMember(member: FamilyMember) {
    setSelectedMember(member);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedMember(null);
    setShowModal(false);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("pages.familyMembers.title")}
          subtitle={t("pages.familyMembers.subtitle")}
          name="Carmen López"
          role={t("roles.admin")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("tables.familyMembers.search")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-5 shadow-[0_16px_40px_rgba(15,25,30,0.08)] sm:p-7">
          {loadError && <div role="alert" className="mb-4 rounded-xl bg-red-100 p-4 text-red-700">{loadError}</div>}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
              {t("pages.familyMembers.title")}
            </h2>

            <button
              onClick={newMember}
              className="rounded-2xl bg-[#0F9E98] px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#0B817C]"
            >
              + {t("pages.familyMembers.new")}
            </button>
          </div>

          <FamilyMembersTable
            familyMembers={familyMembers}
            onDelete={removeMember}
            onEdit={editMember}
            searchTerm={search}
            onSearchTermChange={setSearch}
            hideSearchInput
          />
        </section>

        <Modal
          open={showModal}
          title={
            selectedMember
              ? t("pages.familyMembers.edit")
              : t("pages.familyMembers.new")
          }
          onClose={closeModal}
        >
          <FamilyMemberForm
            key={selectedMember?.id ?? "new"}
            familyMember={selectedMember}
            onSaved={async () => {
              await loadFamilyMembers();
              closeModal();
            }}
          />
        </Modal>
      </main>
    </div>
  );
}
