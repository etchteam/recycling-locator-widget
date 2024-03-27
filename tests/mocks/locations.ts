import config from '@/config';
import { LocationsResponse as LocationsResponseType } from '@/types/locatorApi';

export const LOCATIONS_ENDPOINT = `${config.locatorApiPath}locations/**`;

export const LocationsResponse: LocationsResponseType = {
  items: [
    {
      id: '106011',
      distance: 1.04,
      name: 'Seven Brethren Recycling Centre',
      address: 'Barnstaple, Barnstaple, EX31 2AS',
      latitude: 51.0733,
      longitude: -4.05966,
      locations: [
        {
          materials: [
            {
              id: '79',
              name: 'Car batteries',
              nameCy: 'Batrïau ceir',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '99',
                  code: 'BA100',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '12',
                name: 'Automotive',
                nameCy: 'Modurol',
              },
            },
            {
              id: '28',
              name: 'Batteries',
              nameCy: 'Batrïau',
              popular: true,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '37',
                  code: 'BA200',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '6',
                name: 'Others',
                nameCy: 'Arall',
              },
            },
            {
              id: '1',
              name: 'Cardboard egg boxes',
              nameCy: 'Bocs cardfwrdd ar gyfer wyau',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '1',
                  code: 'CB100',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '1',
                name: 'Cardboard',
                nameCy: 'Cardfwrdd',
              },
            },
            {
              id: '55',
              name: 'Fridge & freezers',
              nameCy: 'Oergelloedd a rhewgelloedd',
              popular: false,
              recycleType: 'Re-use',
              valpakMaterials: [
                {
                  id: '64',
                  code: 'WS100',
                },
                {
                  id: '65',
                  code: 'WE410',
                },
                {
                  id: '66',
                  code: 'WE460',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '10',
                name: 'Electricals',
                nameCy: 'Nwyddau trydanol',
              },
            },
            {
              id: '57',
              name: 'Washing machines & dryers',
              nameCy: 'Peiriannau golchi a sychu',
              popular: false,
              recycleType: 'Re-use',
              valpakMaterials: [
                {
                  id: '68',
                  code: 'WE400',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '10',
                name: 'Electricals',
                nameCy: 'Nwyddau trydanol',
              },
            },
            {
              id: '66',
              name: 'Toasters, kettles, & vacuums',
              nameCy: 'Peiriant tostio, tegell, sugnwr llwch',
              popular: false,
              recycleType: 'Re-use',
              valpakMaterials: [
                {
                  id: '81',
                  code: 'WE720',
                },
                {
                  id: '79',
                  code: 'WS300',
                },
                {
                  id: '80',
                  code: 'WE700',
                },
                {
                  id: '82',
                  code: 'WE710',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '10',
                name: 'Electricals',
                nameCy: 'Nwyddau trydanol',
              },
            },
            {
              id: '70',
              name: 'Energy-saving light bulbs',
              nameCy: 'Bylbiau arbed ynni',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '89',
                  code: 'WS500',
                },
                {
                  id: '142',
                  code: 'WE510',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '10',
                name: 'Electricals',
                nameCy: 'Nwyddau trydanol',
              },
            },
            {
              id: '61',
              name: 'DVD/CD players',
              nameCy: 'Chwaraewyr DVD/CD',
              popular: false,
              recycleType: 'Re-use',
              valpakMaterials: [
                {
                  id: '74',
                  code: 'WE120',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '10',
                name: 'Electricals',
                nameCy: 'Nwyddau trydanol',
              },
            },
            {
              id: '86',
              name: 'Flowers',
              nameCy: 'Blodau',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '106',
                  code: 'CM100',
                },
                {
                  id: '107',
                  code: 'CM400',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '14',
                name: 'Garden waste',
                nameCy: 'Gwastraff gardd',
              },
            },
            {
              id: '20',
              name: 'Glass bottles and jars',
              nameCy: 'Poteli a jariau gwydr',
              popular: true,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '151',
                  code: 'GL200',
                },
                {
                  id: '152',
                  code: 'GL400',
                },
                {
                  id: '149',
                  code: 'GL100',
                },
                {
                  id: '150',
                  code: 'GL300',
                },
              ],
              aliases: [
                {
                  id: '15',
                  alias: 'Aftershave bottles',
                },
                {
                  id: '14',
                  alias: 'Perfume bottles',
                },
              ],
              meta: [
                {
                  id: 12,
                  category: 'HINT',
                  path: null,
                  image: null,
                  title: 'Keep the lids on glass bottles and jars',
                  titleCy: 'Cadwch y caeadau ar boteli a jariau gwydr',
                  subtitle: 'Hints and tips',
                  subtitleCy: 'Syniadau ac awgrymiadau',
                  content:
                    'Before recycling bottles and jars, remove food residue, rinse and recycle with lids on.',
                  contentCy:
                    'Cyn ailgylchu poteli a jariau, tynnwch weddillion bwyd, rinsiwch ac ailgylchwch gyda chaeadau ymlaen.',
                  cta: 'How glass is recycled',
                  ctaCy: 'Sut mae gwydr yn cael ei ailgylchu',
                  ctaLink:
                    'https://www.recyclenow.com/how-to-recycle/glass-recycling',
                  ctaLinkCy:
                    'https://www.walesrecycles.org.uk/cy/sut-i-ailgylchu/sut-caiff-gwydr-ei-ailgylchu',
                },
                {
                  id: 8,
                  category: 'HINT',
                  path: null,
                  image: null,
                  title:
                    'Remember your glass perfume and aftershave bottles are recyclable',
                  titleCy:
                    "Cofiwch fod eich persawr gwydr a'ch poteli eillio yn ailgylchadwy",
                  subtitle: 'Good to know',
                  subtitleCy: 'Da gwybod',
                  content:
                    'These items are often missed for recycling along with other bathroom items. Just make sure they are empty and put them in with your other recyclables at home',
                  contentCy:
                    "Mae'r eitemau hyn yn aml yn cael eu methu i'w hailgylchu ynghyd ag eitemau ystafell ymolchi eraill. Gwnewch yn siŵr eu bod yn wag a rhowch nhw gyda'ch deunyddiau ailgylchadwy eraill gartref",
                  cta: 'How to recycle more from the bathroom',
                  ctaCy: "Sut i ailgylchu mwy o'r ystafell ymolchi",
                  ctaLink:
                    'https://www.recyclenow.com/how-to-recycle/bathroom-recycling',
                  ctaLinkCy:
                    'https://www.walesrecycles.org.uk/cy/sut-i-ailgylchu/sut-i-ailgylchu-or-ystafell-molchi',
                },
              ],
              category: {
                id: '4',
                name: 'Glass',
                nameCy: 'Gwydr',
              },
            },
            {
              id: '22',
              name: 'Window glass',
              nameCy: 'Gwydr ffenestri',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '27',
                  code: 'GL900',
                },
                {
                  id: '26',
                  code: 'GL800',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '4',
                name: 'Glass',
                nameCy: 'Gwydr',
              },
            },
            {
              id: '73',
              name: 'Kitchen oils',
              nameCy: 'Olew coginio',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '92',
                  code: 'LQ200',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '11',
                name: 'Liquids and Chemicals',
                nameCy: 'Hylifau a Chemegau',
              },
            },
            {
              id: '23',
              name: 'Aerosols',
              nameCy: 'Erosolau',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '147',
                  code: 'MT400',
                },
              ],
              aliases: [],
              meta: [
                {
                  id: 7,
                  category: 'HINT',
                  path: null,
                  image: null,
                  title: 'Aerosols can also be recycled',
                  titleCy: 'Gellir ailgylchu erosolau hefyd',
                  subtitle: 'Good to know',
                  subtitleCy: 'Da gwybod',
                  content:
                    'Aerosols are generally made from valuable metals like aluminum which can be recycled again and again. Just make sure they are empty and put them in the home recycling',
                  contentCy:
                    'Yn gyffredinol, mae erosolau yn cael eu gwneud o fetelau gwerthfawr fel alwminiwm y gellir eu hailgylchu dro ar ôl tro. Gwnewch yn siŵr eu bod yn wag a rhowch nhw yn y cartref ailgylchu',
                  cta: 'How cans are recycled',
                  ctaCy: "Sut mae caniau'n cael eu hailgylchu",
                  ctaLink:
                    'https://www.recyclenow.com/how-to-recycle/can-recycling',
                  ctaLinkCy:
                    'https://www.walesrecycles.org.uk/cy/sut-i-ailgylchu/sut-caiff-caniau-eu-hailgylchu',
                },
              ],
              category: {
                id: '5',
                name: 'Metal',
                nameCy: 'Metel',
              },
            },
            {
              id: '24',
              name: 'Drinks cans',
              nameCy: 'Caniau diodydd',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '29',
                  code: 'MT200',
                },
                {
                  id: '30',
                  code: 'MT300',
                },
                {
                  id: '31',
                  code: 'MT600',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '5',
                name: 'Metal',
                nameCy: 'Metel',
              },
            },
            {
              id: '18',
              name: 'Aluminium foil',
              nameCy: 'Papur alwminiwm',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '154',
                  code: 'MT100',
                },
              ],
              aliases: [
                {
                  id: '19',
                  alias: 'Tin foil',
                },
                {
                  id: '21',
                  alias: 'Papur arian',
                },
                {
                  id: '20',
                  alias: 'Kitchen foil',
                },
                {
                  id: '22',
                  alias: 'Silver foil',
                },
              ],
              meta: [],
              category: {
                id: '3',
                name: 'Foil',
                nameCy: 'Ffoil',
              },
            },
            {
              id: '26',
              name: 'Metal lids from glass jars',
              nameCy: 'Caeadau metel jariau gwydr',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '35',
                  code: 'MT500',
                },
              ],
              aliases: [],
              meta: [
                {
                  id: 12,
                  category: 'HINT',
                  path: null,
                  image: null,
                  title: 'Keep the lids on glass bottles and jars',
                  titleCy: 'Cadwch y caeadau ar boteli a jariau gwydr',
                  subtitle: 'Hints and tips',
                  subtitleCy: 'Syniadau ac awgrymiadau',
                  content:
                    'Before recycling bottles and jars, remove food residue, rinse and recycle with lids on.',
                  contentCy:
                    'Cyn ailgylchu poteli a jariau, tynnwch weddillion bwyd, rinsiwch ac ailgylchwch gyda chaeadau ymlaen.',
                  cta: 'How glass is recycled',
                  ctaCy: 'Sut mae gwydr yn cael ei ailgylchu',
                  ctaLink:
                    'https://www.recyclenow.com/how-to-recycle/glass-recycling',
                  ctaLinkCy:
                    'https://www.walesrecycles.org.uk/cy/sut-i-ailgylchu/sut-caiff-gwydr-ei-ailgylchu',
                },
              ],
              category: {
                id: '5',
                name: 'Metal',
                nameCy: 'Metel',
              },
            },
            {
              id: '37',
              name: 'Toner & printer cartridges',
              nameCy: 'Cetris peiriant argraffu',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '46',
                  code: 'WE330',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '6',
                name: 'Others',
                nameCy: 'Arall',
              },
            },
            {
              id: '35',
              name: 'Bric-a-brac',
              nameCy: 'Mân drugareddau',
              popular: false,
              recycleType: 'Re-use',
              valpakMaterials: [
                {
                  id: '44',
                  code: 'MS600',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '6',
                name: 'Others',
                nameCy: 'Arall',
              },
            },
            {
              id: '6',
              name: 'Food and drink cartons',
              nameCy: 'Cartonau bwyd a diodydd',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '153',
                  code: 'PP600',
                },
              ],
              aliases: [
                {
                  id: '17',
                  alias: 'Tetra Pak',
                },
                {
                  id: '18',
                  alias: 'tetra',
                },
              ],
              meta: [
                {
                  id: 13,
                  category: 'HINT',
                  path: null,
                  image: null,
                  title: 'Recycle, but don’t flatten your cartons',
                  titleCy:
                    'Ailgylchwch, ond peidiwch â gwastatáu eich cartonau',
                  subtitle: 'Hints and tips',
                  subtitleCy: 'Syniadau ac awgrymiadau',
                  content:
                    'Just empty the food residue and pop them in the recycling bin as they are.',
                  contentCy:
                    'Gwagiwch y gweddillion bwyd a rhowch nhw yn y bin ailgylchu fel ag y maen nhw.',
                  cta: 'How are cartons recycled?',
                  ctaCy: "Sut mae cartonau'n cael eu hailgylchu?",
                  ctaLink:
                    'https://www.recyclenow.com/how-to-recycle/carton-recycling',
                  ctaLinkCy:
                    'https://www.walesrecycles.org.uk/cy/sut-i-ailgylchu/sut-caiff-cartonau-eu-hailgylchu',
                },
              ],
              category: {
                id: '6',
                name: 'Others',
                nameCy: 'Arall',
              },
            },
            {
              id: '8',
              name: 'Greeting cards',
              nameCy: 'Cardiau cyfarch',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '8',
                  code: 'PP300',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '1',
                name: 'Cardboard',
                nameCy: 'Cardfwrdd',
              },
            },
            {
              id: '9',
              name: 'Brown envelopes',
              nameCy: 'Amlenni brown',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '9',
                  code: 'PP400',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '2',
                name: 'Paper',
                nameCy: 'Papur',
              },
            },
            {
              id: '14',
              name: 'Telephone directories',
              nameCy: 'Cyfeirlyfr ffôn',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '14',
                  code: 'PP500',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '2',
                name: 'Paper',
                nameCy: 'Papur',
              },
            },
            {
              id: '13',
              name: 'Shredded paper',
              nameCy: 'Papur wedi’i falu',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '13',
                  code: 'PP700',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '2',
                name: 'Paper',
                nameCy: 'Papur',
              },
            },
            {
              id: '44',
              name: 'Plastic drinks bottles',
              nameCy: 'Poteli diodydd',
              popular: false,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '135',
                  code: 'PL200',
                },
                {
                  id: '50',
                  code: 'PL100',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '7',
                name: 'Plastic bottles',
                nameCy: 'Poteli plastig',
              },
            },
            {
              id: '52',
              name: 'Clothing',
              nameCy: 'Dillad',
              popular: true,
              recycleType: 'Re-use',
              valpakMaterials: [
                {
                  id: '58',
                  code: 'TX100',
                },
                {
                  id: '59',
                  code: 'TX200',
                },
              ],
              aliases: [],
              meta: [
                {
                  id: 5,
                  category: 'HINT',
                  path: null,
                  image: null,
                  title: 'Recycling clothes and fabrics',
                  titleCy: 'Ailgylchu dillad a ffabrigau',
                  subtitle: 'Did you know',
                  subtitleCy: "Oeddet ti'n gwybod",
                  content:
                    'There are many ways to recycle and re-use old clothes and fabrics and not just in charity shops',
                  contentCy:
                    'Mae sawl ffordd o ailgylchu ac ailddefnyddio hen ddillad a ffabrigau ac nid dim ond mewn siopau elusen',
                  cta: '9 things you didn’t know you could recycle',
                  ctaCy:
                    "9 peth nad oeddech chi'n gwybod y gallech chi eu hailgylchu",
                  ctaLink:
                    'https://www.recyclenow.com/how-to-recycle/nine-things-you-didnt-know-you-could-recycle',
                  ctaLinkCy:
                    'https://www.walesrecycles.org.uk/cy/newyddion-ac-ymgyrchoedd/pethau-na-wyddoch-y-gallech-eu-hailgylchu',
                },
              ],
              category: {
                id: '9',
                name: 'Textiles',
                nameCy: 'Tecstilau',
              },
            },
          ],
          source: 'valpak',
          locationType: 'HWRC',
        },
        {
          materials: [
            {
              id: '28',
              name: 'Batteries',
              nameCy: 'Batrïau',
              popular: true,
              recycleType: 'Recycle',
              valpakMaterials: [
                {
                  id: '37',
                  code: 'BA200',
                },
              ],
              aliases: [],
              meta: [],
              category: {
                id: '6',
                name: 'Others',
                nameCy: 'Arall',
              },
            },
          ],
          source: 'valpak',
          locationType: 'HWRC',
        },
      ],
    },
  ],
  meta: {
    latitude: 51.07872831826983,
    longitude: -4.05529069017698,
    radius: 25,
  },
  pagination: {
    total: 30,
    page: 1,
  },
};
