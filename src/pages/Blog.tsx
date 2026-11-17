import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Seo from "../components/seo/Seo";
import { blogData } from "../seo";

export function BlogIndex() {
  if (!blogData.published) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F7FCFB_45%,#FFFFFF_100%)]">
      <Seo path="/blog" />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Header />
      </div>
      <main className="mx-auto max-w-4xl px-6 pb-16 pt-12">
        <h1 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">Consejos para el cuidado de personas mayores</h1>
        <ul className="mt-8 space-y-4">
          {blogData.posts.map((post) => (
            <li key={post.slug} className="rounded-2xl border border-[#D6F1EE] bg-white p-6">
              <h2 className="text-xl font-bold text-[#1F2937]">
                <Link to={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
              </h2>
              <p className="mt-2 text-[#4B5563]">{post.description}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = blogData.posts.find((p) => p.slug === slug);
  if (!blogData.published || !post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F7FCFB_45%,#FFFFFF_100%)]">
      <Seo path={`/blog/${post.slug}`} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Header />
      </div>
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-12">
        <article className="rounded-[32px] border border-[#D6F1EE] bg-white p-7 sm:p-10">
          <h1 className="text-3xl font-bold leading-tight text-[#1F2937] sm:text-4xl">{post.title}</h1>
          {post.paragraphs.map((text) => (
            <p key={text} className="mt-4 text-base leading-8 text-[#4B5563]">{text}</p>
          ))}
          <p className="mt-8">
            <Link to="/contact" className="font-semibold text-[#0F9E98] hover:underline">
              ¿Necesitas ayuda para un familiar? Contacta con nosotros
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
