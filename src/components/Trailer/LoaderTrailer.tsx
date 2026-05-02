import './loaderTrailer.scss';

export default function LoaderTrailer() {
  return (
    <div className="loader-trailer">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="loader-trailer__item"></div>
      ))}
    </div>
  );
}