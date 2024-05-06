import { Button, Card, Center, Group, NumberInput, Stack, Table, Text } from '@mantine/core';
import { useMemo, useState } from 'react';

// const CORRECT_BG_COLOR = "#00ff0012"
// const WRONG_BG_COLOR = "#ff000012"

interface Item {
  price: number | undefined,
  count: number | undefined,
  per: number | undefined,
  // priceLabel: 'THB',
  // countLabel: 'Unit'
}

const defaultItem: Item = { price: undefined, count: undefined, per: undefined }

function App() {
  const [items, setItems] = useState<Item[]>([{ ...defaultItem }])

  function add() {
    setItems(items => [...items, { ...defaultItem }])
  }

  function clear() {
    setItems([{ ...defaultItem }])
  }

  function onChange(index: number, column: 'price' | 'count', value: number | undefined) {
    setItems(items => items.map((item, i) => {
      const price = column === 'price' ? value : item.price;
      const count = column === 'count' ? value : item.count;
      const per = (price && count) ? price / count : undefined
      if (i === index) {
        return {
          price: price,
          count: count,
          per: per,
        }
      } else {
        return { ...item }
      }
    }))
  }

  const rows = useMemo(() => {
    return items.map((item, i) => (
      <Table.Tr key={i}>
        <Table.Td>
          <NumberInput inputMode="decimal" variant="filled" value={item.price ?? ''} onChange={(value) => onChange(i, 'price', value ? Number(value) : undefined)} size="md" />
        </Table.Td>
        <Table.Td>
          <NumberInput inputMode="decimal" variant="filled" value={item.count ?? ''} onChange={(value) => onChange(i, 'count', value ? Number(value) : undefined)} size="md" />
        </Table.Td>
        <Table.Td>
          <Text>
            {item.per ? Number(item.per).toFixed(2) : '-'}
          </Text>
        </Table.Td>
      </Table.Tr>
    ))
  }, [items])

  return (
    <Center p="md">
      <Card>
        <Stack>
          <Text fw="bold">
            Shopping Calculator
          </Text>
          <Table striped withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Price</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th miw="6em">Price / Unit</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
          <Group justify="space-between">
            <Button color="green" onClick={add}>
              Add More
            </Button>
            <Button variant="outline" color="red" onClick={clear}>
              Clear
            </Button>
          </Group>
        </Stack>
      </Card>
    </Center>
  )
}

export default App
