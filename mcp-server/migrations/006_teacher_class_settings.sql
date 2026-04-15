-- Migration 006: Teacher Class Settings (T4-B)
-- Stores per-teacher class start date for Content Pack unlock logic.
-- Week N unlocks when: class_start_date + (N-1)*7 days <= today

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS class_start_date DATE;
