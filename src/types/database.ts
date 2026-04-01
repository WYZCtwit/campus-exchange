/**
 * Database Types for Campus Exchange
 * Generated from database schema
 *
 * Usage:
 * import { Database } from './types/database'
 * import { createClient } from '@supabase/supabase-js'
 * const supabase = createClient<Database>(url, key)
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          student_id: string | null
          nickname: string
          avatar_url: string | null
          department: string | null
          grade: string | null
          wechat_id: string | null
          bio: string | null
          avg_rating: number | null
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          student_id?: string | null
          nickname: string
          avatar_url?: string | null
          department?: string | null
          grade?: string | null
          wechat_id?: string | null
          bio?: string | null
          avg_rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          nickname?: string
          avatar_url?: string | null
          department?: string | null
          grade?: string | null
          wechat_id?: string | null
          bio?: string | null
          avg_rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: number
          user_id: string
          title: string
          category: SkillCategory
          description: string
          offer_description: string
          want_description: string | null
          price: number | null
          exchange_preference: boolean
          images: string[]
          wechat_contact: string | null
          status: ListingStatus
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          category?: SkillCategory
          description: string
          offer_description: string
          want_description?: string | null
          price?: number | null
          exchange_preference?: boolean
          images?: string[]
          wechat_contact?: string | null
          status?: ListingStatus
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          category?: SkillCategory
          description?: string
          offer_description?: string
          want_description?: string | null
          price?: number | null
          exchange_preference?: boolean
          images?: string[]
          wechat_contact?: string | null
          status?: ListingStatus
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'skills_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      items: {
        Row: {
          id: number
          user_id: string
          title: string
          category: ItemCategory
          description: string
          condition: ItemCondition
          price: number
          original_price: number | null
          exchange_preference: boolean
          images: string[]
          location: string | null
          wechat_contact: string | null
          status: ListingStatus
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          category?: ItemCategory
          description: string
          condition?: ItemCondition
          price: number
          original_price?: number | null
          exchange_preference?: boolean
          images?: string[]
          location?: string | null
          wechat_contact?: string | null
          status?: ListingStatus
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          category?: ItemCategory
          description?: string
          condition?: ItemCondition
          price?: number
          original_price?: number | null
          exchange_preference?: boolean
          images?: string[]
          location?: string | null
          wechat_contact?: string | null
          status?: ListingStatus
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'items_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      teams: {
        Row: {
          id: number
          user_id: string
          title: string
          type: TeamType
          description: string
          target_count: number
          current_count: number
          deadline: string
          roles_needed: string[]
          wechat_contact: string | null
          status: TeamStatus
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          type?: TeamType
          description: string
          target_count: number
          current_count?: number
          deadline: string
          roles_needed?: string[]
          wechat_contact?: string | null
          status?: TeamStatus
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          type?: TeamType
          description?: string
          target_count?: number
          current_count?: number
          deadline?: string
          roles_needed?: string[]
          wechat_contact?: string | null
          status?: TeamStatus
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'teams_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      orders: {
        Row: {
          id: number
          listing_type: ListingType
          listing_id: number
          buyer_id: string
          seller_id: string
          price: number | null
          note: string | null
          status: OrderStatus
          buyer_wechat: string
          seller_wechat: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          listing_type: ListingType
          listing_id: number
          buyer_id: string
          seller_id: string
          price?: number | null
          note?: string | null
          status?: OrderStatus
          buyer_wechat: string
          seller_wechat?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          listing_type?: ListingType
          listing_id?: number
          buyer_id?: string
          seller_id?: string
          price?: number | null
          note?: string | null
          status?: OrderStatus
          buyer_wechat?: string
          seller_wechat?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_buyer_id_fkey'
            columns: ['buyer_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'orders_seller_id_fkey'
            columns: ['seller_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      applications: {
        Row: {
          id: number
          team_id: number
          user_id: string
          reason: string
          wechat_contact: string
          status: ApplicationStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          team_id: number
          user_id: string
          reason: string
          wechat_contact: string
          status?: ApplicationStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          team_id?: number
          user_id?: string
          reason?: string
          wechat_contact?: string
          status?: ApplicationStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'applications_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'teams'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'applications_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      reviews: {
        Row: {
          id: number
          order_id: number
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_order_id_fkey'
            columns: ['order_id']
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_reviewer_id_fkey'
            columns: ['reviewer_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_reviewee_id_fkey'
            columns: ['reviewee_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      conversations: {
        Row: {
          id: number
          participant1_id: string
          participant2_id: string
          listing_type: ListingType | null
          listing_id: number | null
          last_message: string | null
          last_message_at: string | null
          created_at: string
        }
        Insert: {
          id?: number
          participant1_id: string
          participant2_id: string
          listing_type?: ListingType | null
          listing_id?: number | null
          last_message?: string | null
          last_message_at?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          participant1_id?: string
          participant2_id?: string
          listing_type?: ListingType | null
          listing_id?: number | null
          last_message?: string | null
          last_message_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'conversations_participant1_id_fkey'
            columns: ['participant1_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversations_participant2_id_fkey'
            columns: ['participant2_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      messages: {
        Row: {
          id: number
          conversation_id: number
          sender_id: string
          content: string
          message_type: MessageType
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          conversation_id: number
          sender_id: string
          content: string
          message_type?: MessageType
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          conversation_id?: number
          sender_id?: string
          content?: string
          message_type?: MessageType
          is_read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'messages_conversation_id_fkey'
            columns: ['conversation_id']
            referencedRelation: 'conversations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_sender_id_fkey'
            columns: ['sender_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          type: NotificationType
          title: string
          content: string | null
          related_listing_type: ListingType | null
          related_listing_id: number | null
          related_order_id: number | null
          related_application_id: number | null
          related_team_id: number | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: NotificationType
          title: string
          content?: string | null
          related_listing_type?: ListingType | null
          related_listing_id?: number | null
          related_order_id?: number | null
          related_application_id?: number | null
          related_team_id?: number | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: NotificationType
          title?: string
          content?: string | null
          related_listing_type?: ListingType | null
          related_listing_id?: number | null
          related_order_id?: number | null
          related_application_id?: number | null
          related_team_id?: number | null
          is_read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_related_order_id_fkey'
            columns: ['related_order_id']
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_related_application_id_fkey'
            columns: ['related_application_id']
            referencedRelation: 'applications'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      v_listings_summary: {
        Row: {
          type: string
          id: number
          title: string
          category: string
          price: number | null
          status: string
          author: string | null
          created_at: string
        }
        Relationships: []
      }
    }
    Functions: {
      get_or_create_conversation: {
        Args: {
          p_user1: string
          p_user2: string
          p_listing_type?: ListingType | null
          p_listing_id?: number | null
        }
        Returns: number
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_type: NotificationType
          p_title: string
          p_content?: string | null
          p_listing_type?: ListingType | null
          p_listing_id?: number | null
          p_order_id?: number | null
          p_application_id?: number | null
          p_team_id?: number | null
        }
        Returns: void
      }
      expire_past_deadline_teams: {
        Args: Record<string, never>
        Returns: void
      }
    }
    Enums: {
      skill_category: SkillCategory
      item_category: ItemCategory
      item_condition: ItemCondition
      team_type: TeamType
      listing_status: ListingStatus
      team_status: TeamStatus
      order_status: OrderStatus
      application_status: ApplicationStatus
      listing_type: ListingType
      message_type: MessageType
      notification_type: NotificationType
    }
  }
}

// ============================================
// Enum Types
// ============================================
export type SkillCategory =
  | 'coding'
  | 'design'
  | 'academic'
  | 'life'
  | 'art'
  | 'other'

export type ItemCategory =
  | 'books'
  | 'electronics'
  | 'daily'
  | 'sports'
  | 'other'

export type ItemCondition =
  | 'new'
  | 'good'
  | 'fair'
  | 'poor'

export type TeamType =
  | 'competition'
  | 'activity'
  | 'project'

export type ListingStatus =
  | 'active'
  | 'inactive'
  | 'sold'

export type TeamStatus =
  | 'recruiting'
  | 'full'
  | 'ended'

export type OrderStatus =
  | 'pending'
  | 'contacted'
  | 'completed'
  | 'cancelled'

export type ApplicationStatus =
  | 'pending'
  | 'approved'
  | 'rejected'

export type ListingType =
  | 'skill'
  | 'item'

export type MessageType =
  | 'text'
  | 'image'
  | 'system'

export type NotificationType =
  | 'new_order'
  | 'order_contacted'
  | 'order_completed'
  | 'order_cancelled'
  | 'new_application'
  | 'application_approved'
  | 'application_rejected'
  | 'new_message'
  | 'review_received'

// ============================================
// Convenience Types
// ============================================
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Skill = Database['public']['Tables']['skills']['Row']
export type Item = Database['public']['Tables']['items']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type Application = Database['public']['Tables']['applications']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Conversation = Database['public']['Tables']['conversations']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type SkillInsert = Database['public']['Tables']['skills']['Insert']
export type ItemInsert = Database['public']['Tables']['items']['Insert']
export type TeamInsert = Database['public']['Tables']['teams']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type ApplicationInsert = Database['public']['Tables']['applications']['Insert']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type MessageInsert = Database['public']['Tables']['messages']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type SkillUpdate = Database['public']['Tables']['skills']['Update']
export type ItemUpdate = Database['public']['Tables']['items']['Update']
export type TeamUpdate = Database['public']['Tables']['teams']['Update']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']
export type ApplicationUpdate = Database['public']['Tables']['applications']['Update']
