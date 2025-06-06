import { prisma } from '../db.js';


export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.id },
      include: {
        tags: true
      }
    });
    res.json(notes);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ error: 'No se pudieron obtener las notas.' });
  }
};


export const getNote = async (req, res) => {
  const noteFound = await prisma.note.findFirst({
    where: {
      id: parseInt(req.params.id),
      userId: req.user.id // solo si pertenece al usuario
    },
    include: {
      tags: true
    }
  });

  if (!noteFound) return res.status(404).json({ error: "Nota no encontrada" });
  return res.json(noteFound);
};


export const createNote = async (req, res) => {
  const { title, content, archived = false, tagIds = [] } = req.body;

  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        archived,
        User: {
          connect: { id: req.user.id } // Asociación con el usuario autenticado
        },
        tags: {
          connect: tagIds.map(id => ({ id }))
        }
      },
      include: {
        tags: true,
        User: true // opcional: incluir datos del usuario
      }
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ error: 'No se pudo crear la nota.' });
  }
};


export const deleteNote = async (req, res) => {
  const noteDeleted = await prisma.note.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (!noteDeleted) return res.status(404).json({ error: "Product not found " })
  return res.json(noteDeleted);
}

export const updateNote = async (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content, archived, tagIds = [] } = req.body;

  try {
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        content,
        archived,
        tags: {
          set: tagIds.map(id => ({ id })) // actualiza las relaciones con las etiquetas
        }
      },
      include: {
        tags: true // incluye las tags actualizadas en la respuesta
      }
    });

    res.json(updatedNote);
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ error: 'No se pudo actualizar la nota.' });
  }
};