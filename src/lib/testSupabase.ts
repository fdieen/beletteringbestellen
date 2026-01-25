// Tijdelijke test file - kan later verwijderd worden
import { supabase } from '@/integrations/supabase/client';

export async function testSupabaseConnection() {
  console.log('🔄 Testing Supabase connection...');

  try {
    // Test 1: Verbinding maken
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Supabase error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('✅ Supabase connection works!');
    console.log('📊 Orders in database:', data?.length || 0);

    // Test 2: Test insert (we maken een dummy order en verwijderen die weer)
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert({
        product_name: 'Test Sticker',
        width_cm: 10,
        height_cm: 5,
        price: 25.99,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Insert error:', insertError.message);
      return { success: false, error: insertError.message };
    }

    console.log('✅ Test order created:', insertData.id);

    // Verwijder test order
    const { error: deleteError } = await supabase
      .from('orders')
      .delete()
      .eq('id', insertData.id);

    if (deleteError) {
      console.error('⚠️ Delete error:', deleteError.message);
    } else {
      console.log('🗑️ Test order deleted');
    }

    return { success: true, message: 'Alles werkt!' };

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return { success: false, error: String(err) };
  }
}
