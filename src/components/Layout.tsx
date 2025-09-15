import { useAppContext } from "../context/AppContext";

import Modal from "./Modal";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { showModal } = useAppContext();

  return (
    <main className="relative w-full h-auto min-h-dvh bg-neutral-100 dark:bg-neutral-900">
      {children}

      {showModal.show && <Modal />}
    </main>
  );
}

export default Layout;
