import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tdxxtuhlaimmmcesclat.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeHh0dWhsYWltbW1jZXNjbGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNjM2NDksImV4cCI6MjA5NTczOTY0OX0.lgoLL29EEOeTpQAY_enkGmwS1t5S1Ans3Lnip0QRfF8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      mensaje: 'API de LAGOS CIRCULAR funcionando correctamente',
      hora: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const { nombre, email, institucion } = req.body;

      // Nota: sin .select() al final. El rol "anon" solo tiene permiso de INSERT
      // (política insertar_anon), no de SELECT — pedir la fila de vuelta con
      // .select() requiere permiso de lectura y provocaba el error de RLS.
      const { error } = await supabase
        .from('interesados')
        .insert([{ nombre, email, institucion }]);

      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Error al guardar en la base de datos: ' + error.message
        });
      }

      return res.status(200).json({
        success: true,
        mensaje: 'Registro exitoso. Datos guardados en Supabase.'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor: ' + error.message
      });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
