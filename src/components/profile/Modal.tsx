'use client';

import { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';

interface IModalProps {
  open: boolean;
  onClose: () => void;

  title: string;
  desciption?: string;

  firstOnClick?: () => void;
  secondOnClick?: () => void;

  firstText?: string;
  secondText?: string;
  firstColor?: 'white' | 'red';
}

export function ModalProfile({
  open,
  onClose,
  title,
  desciption,
  firstOnClick,
  secondOnClick,
  firstText = 'OK',
  secondText = 'Cancel',
  firstColor = 'white',
}: IModalProps) {
  const handleFirst = useCallback(() => {
    firstOnClick?.();
    onClose?.();
  }, [firstOnClick, onClose]);

  const handleSecond = useCallback(() => {
    secondOnClick?.();
    onClose?.();
  }, [secondOnClick, onClose]);

  const baseButtonStyles = {
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.1) 100%)',
    boxShadow:
      '0px -1px 0px 0px #00000033 inset, 0px 0px 0px 1px #FFFFFF40, 0px 1px 0px 0px #FFFFFF0D inset',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '10px',
  };

  const firstButtonColor =
    firstColor === 'red' ? { color: '#DC2626' } : { color: '#EBEBEB' };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 460 },
          bgcolor: '#1a1a1a',
          color: '#EBEBEB',
          borderRadius: '12px',
          boxShadow: 24,
          p: 3,
          outline: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            gap: 2,
          }}
        >
          <Typography id="modal-title" sx={{ fontSize: 18, fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: '#A3A3A3', '&:hover': { color: '#fff' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {desciption && (
          <Typography
            sx={{ fontSize: 14, color: '#CFCFCF', mb: 3, lineHeight: 1.5 }}
          >
            {desciption}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-start' }}>
          <Button
            onClick={handleFirst}
            sx={{ ...baseButtonStyles, ...firstButtonColor }}
          >
            {firstText}
          </Button>

          {secondOnClick && (
            <Button
              onClick={handleSecond}
              sx={{ ...baseButtonStyles, color: '#EBEBEB' }}
            >
              {secondText}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
