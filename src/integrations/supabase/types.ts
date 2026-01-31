export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          order_number: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          shipping_street: string
          shipping_housenumber: string
          shipping_postal_code: string
          shipping_city: string
          shipping_country: string
          subtotal_cents: number
          shipping_cents: number
          discount_cents: number
          total_cents: number
          payment_method: string | null
          payment_id: string | null
          payment_status: string
          status: string
          customer_notes: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
          paid_at: string | null
          shipped_at: string | null
        }
        Insert: {
          id?: string
          order_number: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          shipping_street: string
          shipping_housenumber: string
          shipping_postal_code: string
          shipping_city: string
          shipping_country?: string
          subtotal_cents: number
          shipping_cents?: number
          discount_cents?: number
          total_cents: number
          payment_method?: string | null
          payment_id?: string | null
          payment_status?: string
          status?: string
          customer_notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          paid_at?: string | null
          shipped_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          shipping_street?: string
          shipping_housenumber?: string
          shipping_postal_code?: string
          shipping_city?: string
          shipping_country?: string
          subtotal_cents?: number
          shipping_cents?: number
          discount_cents?: number
          total_cents?: number
          payment_method?: string | null
          payment_id?: string | null
          payment_status?: string
          status?: string
          customer_notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          paid_at?: string | null
          shipped_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          item_type: string
          text: string | null
          font_id: string | null
          font_name: string | null
          logo_url: string | null
          color_id: string | null
          color_name: string | null
          color_hex: string | null
          width_cm: number | null
          height_cm: number | null
          quantity: number
          unit_price_cents: number
          total_price_cents: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          item_type: string
          text?: string | null
          font_id?: string | null
          font_name?: string | null
          logo_url?: string | null
          color_id?: string | null
          color_name?: string | null
          color_hex?: string | null
          width_cm?: number | null
          height_cm?: number | null
          quantity?: number
          unit_price_cents: number
          total_price_cents: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          item_type?: string
          text?: string | null
          font_id?: string | null
          font_name?: string | null
          logo_url?: string | null
          color_id?: string | null
          color_name?: string | null
          color_hex?: string | null
          width_cm?: number | null
          height_cm?: number | null
          quantity?: number
          unit_price_cents?: number
          total_price_cents?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never
