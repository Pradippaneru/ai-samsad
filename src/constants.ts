export interface Bill {
  id: string;
  title: string;
  category: string;
  status: 'Pending' | 'Passed' | 'Committee' | 'Draft';
  lastUpdated: string;
}

export interface SessionRecord {
  id: string;
  date: string;
  topic: string;
  speaker: string;
  videoUrl?: string;
}

export const MOCK_BILLS: Bill[] = [
  { id: '1', title: 'Federal Civil Service Bill, 2080', category: 'Administration', status: 'Committee', lastUpdated: '2024-05-01' },
  { id: '2', title: 'Economic Bill, 2081', category: 'Finance', status: 'Pending', lastUpdated: '2024-05-08' },
  { id: '3', title: 'School Education Bill, 2080', category: 'Education', status: 'Committee', lastUpdated: '2024-04-15' },
  { id: '4', title: 'Environment Protection Act (Amendment)', category: 'Environment', status: 'Draft', lastUpdated: '2024-05-10' },
];

export const MOCK_RECORDS: SessionRecord[] = [
  { id: '1', date: '2024-05-09', topic: 'Pre-budget discussion for FY 2081/82', speaker: 'Hon. Finance Minister' },
  { id: '2', date: '2024-05-08', topic: 'Urgent motion on disaster management', speaker: 'Hon. Home Minister' },
];
