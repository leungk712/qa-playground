import { useEffect, useState } from 'react';

// ===== Material UI ===== //
import { Box, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';

// ===== Components ===== //

// ===== Constants ===== //

// ===== Helpers ===== //

// ===== Interfaces ===== //
interface Pokemon {
  name: string;
  url: string;
}

type Params = GridRenderCellParams<any, string>;

// ===== Redux ===== //

// ===== Styles ===== //

export default function Pokemon() {
  const [rows, setRows] = useState<Pokemon[]>([]);

  const handleUrlClick = (url: string) => {
    window.open(url, '_blank')!.focus();
  };

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100000`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        setRows(data.results);
      } catch (err) {
        console.log('err', err);
      }
    }

    fetchPokemon();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.1,
      valueGetter: (value: string) => {
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      },
    },
    {
      field: 'pokedex',
      headerName: 'Pokedex #',
      flex: 0.1,
      renderCell: (params: Params) => {
        const pokedexNum = params.row.url
          .split('pokemon/')
          .pop()
          .replace('/', '');

        return (
          <Box className="h-100" sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{pokedexNum}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'Image',
      headerName: 'Image',
      flex: 0.25,
      renderCell: (params: Params) => (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={`https://img.pokemondb.net/artwork/${params.row.name}.jpg`}
            alt={params.row.name}
            sx={{
              height: 50,
              width: 50,
            }}
          />
        </Box>
      ),
    },
    {
      field: 'url',
      headerName: 'Url',
      flex: 0.25,
      renderCell: (params: Params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline',
            }}
            onClick={() => handleUrlClick(params.row.url)}
          >
            <a>{params.row.url}</a>
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 8, pb: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Pokemon
      </Typography>

      <DataGrid
        getRowId={(item: Pokemon) => item?.name as string}
        rowHeight={70}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
