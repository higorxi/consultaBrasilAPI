import { Badge } from "src/entity/badge.entity";

export class UpdateResponseDTO {
    user: {
      email: string;
      id: string; 
      name: string;
      role: string;
      badges: Badge[];
      profileImageUrl: string;
    };
  }

  