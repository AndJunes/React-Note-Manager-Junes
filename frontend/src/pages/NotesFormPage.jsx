import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useNotes } from "../context/notesContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import useTags from "../hooks/useTags"; // <-- importás tu nuevo hook

export function NoteFormPage() {
  const { createNote, getNote, updateNote } = useNotes();
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [error, setError] = useState(null);

  const { tags, loading: tagsLoading, error: tagsError } = useTags();

  useEffect(() => {
    setValue("tagIds", selectedTagIds);
  }, [selectedTagIds, setValue]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        title: data.title,
        content: data.content,
        archived: !!data.archived,
        tagIds: selectedTagIds,
      };

      if (params.id) {
        await updateNote(params.id, formattedData);
      } else {
        await createNote(formattedData);
      }
      navigate("/notes");
    } catch (error) {
      console.error(error);
      setError("Error saving note. Please try again.");
    }
  };

  const handleTagSelect = (tagId) => {
    setSelectedTagIds(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        if (params.id) {
          const note = await getNote(params.id);
          if (note) {
            setValue("title", note.title);
            setValue("content", note.content);
            setValue("archived", note.archived);
            setSelectedTagIds(note.tags.map(tag => tag.id));
          }
        }
      } catch (err) {
        console.error("Error loading note:", err);
        setError("Failed to load note. Please refresh the page.");
      }
    };

    fetchNoteData();
  }, [params.id]);

  if (tagsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          {params.id ? "Edit Note" : "Create New Note"}
        </h1>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              placeholder="Note title"
              {...register("title", { required: true })}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">Title is required.</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="Write your note content here..."
              rows="6"
              {...register("content", { required: true })}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">Content is required.</p>
            )}
          </div>

          <div className="flex items-center">
            <Input 
              type="checkbox" 
              id="archived"
              {...register("archived")} 
            />
            <Label htmlFor="archived" className="ml-2">
              Archive this note
            </Label>
          </div>

          <div>
            <Label>Tags</Label>
            
            <Menu as="div" className="relative">
              <MenuButton className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div className="flex flex-wrap gap-1">
                  {selectedTagIds.length > 0 ? (
                    selectedTagIds.map(tagId => {
                      const tag = tags.find(t => t.id === tagId);
                      return tag ? (
                        <span 
                          key={tag.id} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag.name}
                        </span>
                      ) : null;
                    })
                  ) : (
                    <span className="text-gray-400">Select tags</span>
                  )}
                </div>
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <MenuItems className="absolute z-10 mt-2 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {tags.map((tag) => (
                    <MenuItem key={tag.id}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => handleTagSelect(tag.id)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700`}
                        >
                          <span>{tag.name}</span>
                          {selectedTagIds.includes(tag.id) && (
                            <CheckIcon className="h-4 w-4 text-blue-500" />
                          )}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
            
            <input 
              type="hidden" 
              {...register("tagIds")} 
              value={selectedTagIds} 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/notes")}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Note
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
