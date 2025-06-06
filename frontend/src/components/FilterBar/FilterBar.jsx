import Category from './Category';
import FilterButton from './FilterButton';

const FilterBar = ({ 
  onStateChange, 
  onTagToggle, 
  availableTags,
  currentState,
  selectedTags
}) => {
  // Iconos para las categorías
  const StateIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const TagIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );

  return (
    <div className="mb-8">
      <Category title="Estado" icon={<StateIcon />}>
        <FilterButton 
          onClick={() => onStateChange('all')}
          isSelected={currentState === 'all'}
          type="state"
        >
          Todas
        </FilterButton>
        <FilterButton 
          onClick={() => onStateChange('active')}
          isSelected={currentState === 'active'}
          type="state"
        >
          Activas
        </FilterButton>
        <FilterButton 
          onClick={() => onStateChange('archived')}
          isSelected={currentState === 'archived'}
          type="state"
        >
          Archivadas
        </FilterButton>
      </Category>

      <Category title="Etiquetas" icon={<TagIcon />}>
        {availableTags.map(tag => (
          <FilterButton
            key={tag}
            onClick={() => onTagToggle(tag)}
            isSelected={selectedTags.includes(tag)}
            type="tag"
          >
            {tag}
          </FilterButton>
        ))}
      </Category>
    </div>
  );
};

export default FilterBar;