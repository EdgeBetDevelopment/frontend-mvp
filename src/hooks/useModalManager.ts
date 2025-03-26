import { useCallback, useState } from 'react';

interface IUseModalManager {
  isModalOpen: (id: string) => boolean;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  toggleModal: (id: string) => void;
}

const useModalManager = (): IUseModalManager => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const isModalOpen = useCallback((id: string) => !!modals[id], [modals]);

  const openModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: false }));
  }, []);

  const toggleModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useModalManager;
