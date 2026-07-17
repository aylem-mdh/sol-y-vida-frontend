import { useEffect, useState } from "react";
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
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<FamilyMember | null>(null);

  useEffect(() => {
    loadFamilyMembers();
  }, []);

  async function loadFamilyMembers() {
    try {
      const data = await getFamilyMembers();
      setFamilyMembers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeMember(id: number) {
    if (!window.confirm("¿Seguro que deseas eliminar este familiar?"))
      return;

    try {
      await deleteFamilyMember(id);

      setFamilyMembers((prev) =>
        prev.filter((m) => m.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el familiar.");
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
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Familiares"
          subtitle="Gestiona los familiares de los clientes."
          name="Carmen López"
          role="Administradora"
        />

        <section className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Familiares
            </h2>

            <button
              onClick={newMember}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition"
            >
              + Nuevo Familiar
            </button>
          </div>

          <FamilyMembersTable
            familyMembers={familyMembers}
            onDelete={removeMember}
            onEdit={editMember}
          />
        </section>

        <Modal
          open={showModal}
          title={
            selectedMember
              ? "Editar familiar"
              : "Nuevo familiar"
          }
          onClose={closeModal}
        >
          <FamilyMemberForm
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
