import { refs } from "./refs";

export function openModal() {
    refs.modal.classList.add("modal--is-open")
    refs.body.style.overflow = "hidden"
    window.addEventListener('keydown', onEscapePress);
    refs.modal.addEventListener("click", onBackdropClick)
}

export function closeModal() {
    refs.modal.classList.remove("modal--is-open")
    refs.body.style.overflow = ""
    window.removeEventListener("keydown", onEscapePress)
    refs.modal.removeEventListener("click", onBackdropClick)
}

function onEscapePress(e) {
    if (e.code === "Escape") {
        closeModal();
    }
}

function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
        closeModal()
    }
}
