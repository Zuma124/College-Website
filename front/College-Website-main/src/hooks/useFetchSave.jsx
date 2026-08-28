export const saveSelection = async (userId, selectedSubjects) => {
    const response = await fetch('...', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
      }),
    });
  
    if (!response.ok) {
      throw new Error('Не вдалося зберегти вибір');
    }
  
    return response.json();
  };