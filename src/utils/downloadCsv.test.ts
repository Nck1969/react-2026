import { BULBASAUR, CHARMANDER } from '../constants/testPokemons.ts';
import downloadCsv from './downloadCsv.ts';

let mockClick: ReturnType<typeof vi.fn>;
let mockSetAttribute: ReturnType<typeof vi.fn>;

describe('downloadCsv', () => {
  beforeEach(() => {
    // jsdom (browser emulation can't work with blob)
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn(),
    });

    mockClick = vi.fn();
    mockSetAttribute = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: mockSetAttribute,
      click: mockClick,
      style: {},
    } as unknown as HTMLElement);

    vi.spyOn(document.body, 'appendChild').mockImplementation(
      () => ({}) as unknown as Node
    );
    vi.spyOn(document.body, 'removeChild').mockImplementation(
      () => ({}) as unknown as Node
    );
  });

  it('should generate csv with correct content', async () => {
    const blobSpy = vi.spyOn(globalThis, 'Blob');

    downloadCsv([BULBASAUR]);

    expect(blobSpy).toHaveBeenCalledWith(
      ['id, name, height, weight, types\n1, bulbasaur, 0.7, 6.9, Grass|Poison'],
      { type: 'text/csv' }
    );
  });

  it("should name file with pokemon's count", async () => {
    downloadCsv([BULBASAUR, CHARMANDER]);

    expect(mockSetAttribute).toHaveBeenCalledWith('download', '2_items.csv');
  });

  it('should revoke object URL after download', async () => {
    downloadCsv([BULBASAUR, CHARMANDER]);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
