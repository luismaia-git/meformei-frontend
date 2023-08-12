declare module "AdditionalHours" {
  type SituationType = "Deferido" | "Indeferido" | "Sem resposta";
  interface AdditionalHour {
    situation: SituationType;
    activity_type: string;
    participation_type: string;
    activity_title: string;
    atUfc: boolean;
    institution_name: string;
    institution_country: string;
    institution_cnpj: string;
    date: {
      start_date: string;
      end_date: string;
    };
    amount_hours: number;
  }
}
