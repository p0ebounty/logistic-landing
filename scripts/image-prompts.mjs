// Prompts for the landing's editorial imagery. Every image shares one art direction so the set reads as a series.

const STYLE = `Art direction: photorealistic editorial photography for a premium B2B technology brand that serves North American freight companies. Color grade: deep ink-navy shadows and night tones, warm brass-gold and sodium-amber artificial light, crisp white highlights, and only a restrained hint of highway-sign green where signs would naturally be. Medium-format camera look, razor-sharp detail, subtle natural film grain, calm and confident mood, uncluttered composition with generous negative space. There must be no text, letters, numbers, logos, brand markings, license plates, watermarks, UI overlays or recognizable faces anywhere in the image.`;

export const IMAGES = [
  {
    name: 'hero-interchange',
    aspectRatio: '21:9',
    resolution: '4K',
    prompt: `Top-down aerial drone photograph at night of a vast multi-level highway stack interchange on the edge of an American city. Long-exposure light trails in brass-gold and white flow smoothly through the curving ramps and merge lanes, forming an elegant, orderly routing pattern: many directions, clear lanes, no collisions. A few semi-trucks read as longer, brighter streaks. The surrounding land is deep ink-navy darkness with faint texture of fields, service roads and warehouse roofs. The dense heart of the interchange sits in the right half of the frame; the left 45% of the frame stays calm and dark so a headline can be set over it. ${STYLE}`,
  },
  {
    name: 'hero-interchange-portrait',
    aspectRatio: '2:3',
    resolution: '2K',
    prompt: `Top-down aerial drone photograph at night of a multi-level highway stack interchange. Long-exposure light trails in brass-gold and white flow through the curving ramps in an elegant, orderly routing pattern, a few semi-trucks visible as brighter streaks. The interchange fills the lower 55% of the vertical frame; the upper 45% is calm, dark ink-navy land with faint field texture so text can be set over it. ${STYLE}`,
  },
  {
    name: 'challenge-leads',
    aspectRatio: '3:2',
    resolution: '2K',
    prompt: `High aerial photograph at blue hour of a large freight distribution center with one long, perfectly straight row of loading docks. Most dock doors are dark. Exactly three docks glow with warm brass light where unbranded semi-trucks are backing in, clearly the priority loads of the moment. Wet asphalt reflects the light; parking stripes and trailer roofs create a clean geometric rhythm. ${STYLE}`,
  },
  {
    name: 'challenge-calls',
    aspectRatio: '3:2',
    resolution: '2K',
    prompt: `Night photograph beside an interstate highway on the open plains: a slender telecom tower with a single small red aviation light rises into a deep ink-navy sky with a few stars, while long-exposure brass and white light trails of trucks sweep past below it. Light haze near the ground, a feeling of constant connection and nonstop activity. Low camera angle, wide composition, the tower slightly off center. ${STYLE}`,
  },
  {
    name: 'challenge-tenders',
    aspectRatio: '3:2',
    resolution: '2K',
    prompt: `Aerial photograph at dawn of a large truck trailer yard: hundreds of unbranded white and grey semi-trailers parked in perfectly aligned rows, long shadows stretching across the asphalt. The first warm brass sunlight touches the trailer roofs along one edge of the frame while the rest of the yard is still in cool ink-navy shade. A feeling of precise preparation and exact timing. ${STYLE}`,
  },
  {
    name: 'challenge-crm',
    aspectRatio: '3:2',
    resolution: '2K',
    prompt: `Aerial drone photograph at night of three separate highways arriving from different directions and merging into one wide, smoothly flowing highway. Long-exposure light trails: each incoming road carries its own stream of brass-gold and white light, and after the merge they continue as one coherent, orderly flow. Deep ink-navy surroundings, balanced and calm composition. ${STYLE}`,
  },
  {
    name: 'pilot-highway',
    aspectRatio: '21:9',
    resolution: '2K',
    prompt: `Wide cinematic photograph just before dawn of a straight, empty two-lane highway crossing open prairie toward a distant horizon. One semi-truck far ahead with its lights on. The sky shifts from deep ink-navy at the top to a thin band of warm brass-gold light at the horizon; the road's center line leads the eye to the vanishing point. Quiet, decisive, forward-looking mood. The upper half and the left third of the frame stay calm so text can be set over them. ${STYLE}`,
  },
];
