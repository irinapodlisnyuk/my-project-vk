import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { SearchForm } from "./SearchForm";
import { fetchSearchMovies, clearSearch } from "@/slice/movieSlice";

// 1. Мокаем зависимости (подменяем реальные функции на "пустышки")
jest.mock("@/slice/movieSlice", () => ({
  fetchSearchMovies: jest.fn((query) => ({
    type: "movies/fetchSearchMovies",
    payload: query,
  })),
  clearSearch: jest.fn(() => ({
    type: "movies/clearSearch",
  })),
}));

jest.mock("@/models/Icon", () => ({
  Icon: () => <span>icon</span>,
}));

jest.mock("../SearchResults/SearchResults", () => ({
  SearchResults: () => <div>results</div>,
}));

describe("SearchForm", () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: { movies: (state = {}) => state },
    });
    jest.clearAllMocks();
    jest.useFakeTimers(); // "Останавливаем" реальное время для теста дебаунса
  });

  afterEach(() => {
    jest.useRealTimers(); // Возвращаем время в норму
  });

  const setup = (props = {}) =>
    render(
      <Provider store={store}>
        <SearchForm {...props} />
      </Provider>,
    );

  test("обновляет текст и вызывает поиск с задержкой", () => {
    setup();
    const input = screen.getByPlaceholderText("Поиск") as HTMLInputElement;

    // Имитируем ввод текста
    fireEvent.change(input, { target: { value: "Marvel" } });
    expect(input.value).toBe("Marvel");

    expect(fetchSearchMovies).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(fetchSearchMovies).toHaveBeenCalledWith("Marvel");
  });

  test("очищает результаты, если введено меньше 3 символов", () => {
    setup();
    const input = screen.getByPlaceholderText("Поиск");

    fireEvent.change(input, { target: { value: "Hi" } });

    expect(clearSearch).toHaveBeenCalled();
  });

  test("кнопка 'X' очищает инпут и вызывает onClose", () => {
    const onClose = jest.fn();
    setup({ onClose });

    const input = screen.getByPlaceholderText("Поиск") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Avatar" } });

    const closeBtn = screen.getByRole("button");
    fireEvent.pointerDown(closeBtn);

    expect(input.value).toBe("");
    expect(onClose).toHaveBeenCalled();
  });
});
