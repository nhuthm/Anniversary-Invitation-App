export type Category = 'dinner' | 'activity';

export interface SelectionState {
  dinnerChoice: string;
  activityChoice: string;
}

export type Step = 'cover' | 'dinner' | 'activity' | 'confirm' | 'sent';