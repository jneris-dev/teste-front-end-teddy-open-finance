import { useState } from "react";

import Modal from "./Modal";
import type { ModuleTypes } from "../interfaces/modal_interface";

interface LayoutProps {
  children: React.ReactNode;
}

interface ShowModalState {
  show: boolean;
  module: ModuleTypes;
}

function Layout({ children }: LayoutProps) {
  const [showModal, setShowModal] = useState<ShowModalState>({
    show: false,
    module: "",
  });

  return (
    <main className="relative w-full h-auto min-h-dvh bg-stone-100">
      {children}

      {showModal.show && (
        <Modal
          title={null}
          onClose={() => setShowModal({ show: false, module: "" })}
          onSubmit={() => {}}
          module={showModal.module as ModuleTypes}
          description={null}
          data={null}
        />
      )}
    </main>
  );
}

export default Layout;
