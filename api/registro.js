const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_KEY = 'TU_CLAVE_ANON_PUBLICA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { nombre, email, institucion } = req.body;
      const { error } = await supabase
        .from('interesados')
        .insert([{ nombre, email, institucion }]);
      if (error) throw error;
      return res.status(200).json({ success: true, mensaje: 'Registro exitoso' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ mensaje: 'API de LAGOS CIRCULAR funcionando correctamente' });
  }
}
