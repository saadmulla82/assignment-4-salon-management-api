const supabase = require('../config/supabase');

const salonModel = {
  async findAll() {
    const { data, error } = await supabase.from('salons').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async findById(id) {
    const { data, error } = await supabase.from('salons').select('*').eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  async findTopRated(limit = 5) {
    const { data, error } = await supabase.from('salons').select('*').order('rating', { ascending: false }).limit(limit);
    if (error) throw error;
    return data;
  },
  async findByCity(city) {
    const { data, error } = await supabase.from('salons').select('*').ilike('city', city);
    if (error) throw error;
    return data;
  },
  async create({ name, city, address, rating }) {
    const { data, error } = await supabase.from('salons').insert([{ name, city, address, rating: rating !== undefined ? Number(rating) : 0 }]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, updates) {
    const { data, error } = await supabase.from('salons').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async delete(id) {
    const { data, error } = await supabase.from('salons').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};
module.exports = salonModel;