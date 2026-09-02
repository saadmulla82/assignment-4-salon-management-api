const supabase = require('../config/supabase');

const serviceModel = {
  async findBySalonId(salonId) {
    const { data, error } = await supabase.from('services').select('*').eq('salon_id', salonId);
    if (error) throw error;
    return data;
  },
  async findAvailable() {
    const { data, error } = await supabase.from('services').select('*, salons(name, city)').eq('is_available', true);
    if (error) throw error;
    return data;
  },
  async findById(id) {
    const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  async create({ salon_id, service_name, price, duration, is_available }) {
    const { data, error } = await supabase.from('services').insert([{ salon_id, service_name, price: Number(price), duration, is_available: is_available !== undefined ? is_available : true }]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, updates) {
    const payload = {};
    if (updates.service_name !== undefined) payload.service_name = updates.service_name;
    if (updates.serviceName !== undefined) payload.service_name = updates.serviceName;
    if (updates.price !== undefined) payload.price = Number(updates.price);
    if (updates.duration !== undefined) payload.duration = updates.duration;
    if (updates.is_available !== undefined) payload.is_available = updates.is_available;
    if (updates.isAvailable !== undefined) payload.is_available = updates.isAvailable;
    
    const { data, error } = await supabase.from('services').update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async delete(id) {
    const { data, error } = await supabase.from('services').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};
module.exports = serviceModel;