export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  locale: string;
};

// `messageRef` is a decoy field: it is hidden from people, so only bots fill it in. The name is
// deliberately meaningless - anything resembling `company`, `organization` or another autofill
// token gets populated from the browser's saved address profile, which would silently discard a
// genuine submission.
export type ContactRequest = Partial<ContactSubmission> & {
  messageRef?: string;
  turnstileToken?: string;
};

export type ContactError = 'invalid_input' | 'verification_failed' | 'email_not_configured' | 'send_failed';
