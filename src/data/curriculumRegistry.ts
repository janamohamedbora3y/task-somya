import { Unit } from '../types/curriculum';
import { UNIT_1_RAHMA } from './units/unit1_rahma';
import { UNIT_2_UKHUWWAH } from './units/unit2_ukhuwwah';
import { UNIT_3_TAQWA } from './units/unit3_taqwa';

/**
 * Curriculum Registry
 * 
 * This registry holds all units for the 6th Grade Islamic Education curriculum.
 * Each unit has its own dedicated space, multi-page interactive lessons,
 * activities, multimedia, and assessments.
 * 
 * Unit 1: «الرَّحْمَةُ وَالرِّفْقُ» (كاملة)
 * Unit 2: «الأُخُوَّةُ فِي الدِّينِ» (كاملة)
 * Unit 3: «التَّقْوَى وَالْعَمَلُ الصَّالِحُ» (كاملة من كتاب الوزارة الأصلي)
 */

export const REGISTERED_UNITS: Unit[] = [
  // 1. الوحدة الأولى: الرَّحْمَةُ وَالرِّفْقُ (المقرر الرسمي الكامل للصف السادس الابتدائي)
  UNIT_1_RAHMA,

  // 2. الوحدة الثانية: الأُخُوَّةُ فِي الدِّينِ (المقرر الرسمي الكامل للصف السادس الابتدائي)
  UNIT_2_UKHUWWAH,

  // 3. الوحدة الثالثة: التَّقْوَى وَالْعَمَلُ الصَّالِحُ (المقرر الرسمي الكامل للصف السادس الابتدائي)
  UNIT_3_TAQWA,
];
