import React from 'react';

export const CharacterFeaturesHelp = () => {
  // Full feature list based on the Wolfram code (previous + new)
  const featureGroups = [
    {
      category: "Face and Skin",
      items: [
        "Oval face", "Square face", "Round face", "Diamond face",
        "Dark skin", "Light skin", "Freckled skin", "Wrinkled skin"
      ]
    },
    {
      category: "Facial Hair",
      items: [
        "Full beard", "Close beard", "Sparse beard", "No beard",
        "Thick mustache", "Thin mustache", "Goatee", "Long sideburns"
      ]
    },
    {
      category: "Eyes and Gaze",
      items: [
        "Large eyes", "Slanted eyes", "Almond eyes", "Droopy eyes",
        "Brown eyes", "Blue eyes", "Green eyes", "Thick eyebrows", "Straight eyebrows"
      ]
    },
    {
      category: "Hair",
      items: [
        "Black hair", "Blonde hair", "Light brown hair",
        "Curly hair", "Straight hair", "Wavy hair",
        "Long hair", "Short hair"
      ]
    },
    {
      category: "Features (Nose/Mouth/Ears)",
      items: [
        "Aquiline nose", "Upturned nose", "Wide nose",
        "Large mouth", "Thick lips", "Thin lips",
        "Large ears", "Close-set ears", "Cleft chin"
      ]
    },
    {
      category: "Scars and Marks",
      items: [
        "Scar on cheek", "Scar on eyebrow", "Scar on lip",
        "Vertical scar", "Large scar",
        "Has moles", "Has freckles"
      ]
    },
    {
      category: "Build and Expression",
      items: [
        "Slim build", "Robust", "Athletic", "Stocky",
        "Serious expression", "Smiling", "Angry", "Sad"
      ]
    },
    {
      category: "Accessories and Age",
      items: [
        "Wears glasses", "Wears eyeglasses", "Has earrings", "Has piercing", "Wears cap",
        "Teenager", "Elderly", "Child"
      ]
    }
  ];

  return (
    <div className="features-container" style={{ 
      backgroundColor: '#0C111C', 
      padding: '1.5rem', 
      borderRadius: '12px',
      fontFamily: 'sans-serif'
    }}>
      <h3 style={{ color: '#D5E2FF', marginBottom: '1rem', fontSize: '1.1rem' }}>
      Recognizable Features Guide
      </h3>
      
      <div className="grid grid-cols-4" style={{ 
        gap: '1rem' 
      }}>
        {featureGroups.map((group, index) => (
          <div key={index} style={{  
            padding: '1rem', 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ 
              color: '#93B4FF', 
              margin: '0 0 0.5rem 0', 
              fontSize: '0.9rem', 
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '4px'
            }}>
              {group.category}
            </h4>
            <div className="grid grid-cols-2">
              {group.items.map((tag, idx) => (
                <span key={idx} style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  
                  padding: '2px 6px',
                  
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default CharacterFeaturesHelp;
