export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      component_properties: {
        Row: {
          component_id: string;
          created_at: string;
          properties_id: string;
        };
        Insert: {
          component_id: string;
          created_at?: string;
          properties_id: string;
        };
        Update: {
          component_id?: string;
          created_at?: string;
          properties_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "component_properties_component_id_fkey";
            columns: ["component_id"];
            isOneToOne: false;
            referencedRelation: "components";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "component_properties_properties_id_fkey";
            columns: ["properties_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      components: {
        Row: {
          code: string | null;
          created_at: string;
          created_by: string;
          description: string | null;
          id: string;
          keywords: string[] | null;
          name: string;
          status: Database["public"]["Enums"]["component_status"];
          updated_at: string;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          created_by: string;
          description?: string | null;
          id?: string;
          keywords?: string[] | null;
          name: string;
          status: Database["public"]["Enums"]["component_status"];
          updated_at?: string;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          created_by?: string;
          description?: string | null;
          id?: string;
          keywords?: string[] | null;
          name?: string;
          status?: Database["public"]["Enums"]["component_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "components_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      pages: {
        Row: {
          code: string | null;
          id: string;
          path: string;
        };
        Insert: {
          code?: string | null;
          id?: string;
          path: string;
        };
        Update: {
          code?: string | null;
          id?: string;
          path?: string;
        };
        Relationships: [];
      };
      project_components: {
        Row: {
          component_id: string;
          created_at: string;
          project_id: string;
        };
        Insert: {
          component_id: string;
          created_at?: string;
          project_id: string;
        };
        Update: {
          component_id?: string;
          created_at?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_components_component_id_fkey";
            columns: ["component_id"];
            isOneToOne: false;
            referencedRelation: "components";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_components_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_pages: {
        Row: {
          created_at: string;
          page_id: string;
          project_id: string;
        };
        Insert: {
          created_at?: string;
          page_id: string;
          project_id: string;
        };
        Update: {
          created_at?: string;
          page_id?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_pages_page_id_fkey";
            columns: ["page_id"];
            isOneToOne: false;
            referencedRelation: "pages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_pages_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          avatar: string | null;
          config: Json | null;
          created_at: string;
          created_by: string;
          id: string;
          is_hosted: boolean | null;
          name: string;
          slug: string;
          updated_at: string;
        };
        Insert: {
          avatar?: string | null;
          config?: Json | null;
          created_at?: string;
          created_by: string;
          id?: string;
          is_hosted?: boolean | null;
          name: string;
          slug: string;
          updated_at?: string;
        };
        Update: {
          avatar?: string | null;
          config?: Json | null;
          created_at?: string;
          created_by?: string;
          id?: string;
          is_hosted?: boolean | null;
          name?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      properties: {
        Row: {
          code_name: string;
          created_at: string;
          description: string | null;
          id: string;
          is_list: boolean | null;
          object_schema: Json | null;
          required: boolean | null;
          type: Database["public"]["Enums"]["properties_type"];
          updated_at: string;
          visual_name: string;
        };
        Insert: {
          code_name: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_list?: boolean | null;
          object_schema?: Json | null;
          required?: boolean | null;
          type: Database["public"]["Enums"]["properties_type"];
          updated_at?: string;
          visual_name: string;
        };
        Update: {
          code_name?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_list?: boolean | null;
          object_schema?: Json | null;
          required?: boolean | null;
          type?: Database["public"]["Enums"]["properties_type"];
          updated_at?: string;
          visual_name?: string;
        };
        Relationships: [];
      };
      user_projects: {
        Row: {
          created_at: string;
          project_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          project_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          auth_id: string | null;
          avatar: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
        };
        Insert: {
          auth_id?: string | null;
          avatar?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id?: string;
        };
        Update: {
          auth_id?: string | null;
          avatar?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_component_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      generate_page_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      generate_project_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      generate_properties_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      generate_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      component_status: "public" | "private" | "in_review";
      properties_type: "string" | "number" | "boolean" | "object" | "self";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
