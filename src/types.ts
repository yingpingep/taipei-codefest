export type Classification = {
  residence: string;
  age: string;
  disability: string;
  income: string;
};

export type Service = {
  title: string;
  category: string;
  serviceDescription: string;
  targetAudience: string;
  serviceTime: string;
  contactInformation: string;
  applicationProcessAndLinks: string;
  classification: Classification;
};
