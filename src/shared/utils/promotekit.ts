/**
 * PromoteKit referral utilities
 */

declare global {
  interface Window {
    promotekit_referral?: string;
    promotekit?: {
      refer: (email: string) => void;
    };
  }
}

/**
 * Gets the PromoteKit referral code from window object
 * The PromoteKit script automatically stores the referral in window.promotekit_referral
 * @returns The referral code or undefined if not present
 */
export const getPromotekitReferral = (): string | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return window.promotekit_referral;
};

/**
 * Applies the referral to a user after successful registration
 * This should be called after user registration is complete
 * @param userEmail The email of the newly registered user
 */
export const applyPromotekitReferral = (userEmail: string): void => {
  const referral = getPromotekitReferral();

  if (!referral || typeof window === 'undefined') {
    return;
  }

  // Call PromoteKit's refer function if it exists
  if (typeof window.promotekit?.refer === 'function') {
    try {
      window.promotekit.refer(userEmail);
    } catch (error) {
      console.error('Failed to apply PromoteKit referral:', error);
    }
  }
};

/**
 * Checks if a referral code exists
 * @returns true if a referral code is present
 */
export const hasPromotekitReferral = (): boolean => {
  return !!getPromotekitReferral();
};
