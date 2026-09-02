const supabase = require('../config/supabase');

const userModel = {
  async findByEmail(email) {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  async create({ username, email, password }) {
    const { data, error } = await supabase.from('users').insert([{ username, email, password }]).select('id, username, email, created_at').single();
    if (error) throw error;
    return data;
  }
};
module.exports = userModel;