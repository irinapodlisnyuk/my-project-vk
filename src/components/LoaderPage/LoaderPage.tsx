export default function LoaderPage() {
  return (
    <div className="loader-wrapper">
      <div className="loader-page">
        {/*  13 div-ов для анимации */}
        {[...Array(13)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
}

