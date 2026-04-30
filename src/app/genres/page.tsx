import GenresList from "@/components/GenresPage/GenresList/GenresList";

export default async function GenresPage() {
  return (
    <section className="genres">
      <div className="container">
        <h2 className="genres__title">Жанры фильмов</h2>
        <GenresList />
      </div>
    </section>
  );
}
