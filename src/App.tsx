import { Button, Card, Center, Group, NumberInput, Stack, Table, Text } from '@mantine/core';
import { useMemo, useState } from 'react';

// const CORRECT_BG_COLOR = "#00ff0012"
// const WRONG_BG_COLOR = "#ff000012"

interface Item {
  price: number | undefined,
  count: number | undefined,
  // priceLabel: 'THB',
  // countLabel: 'Unit'
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { price: undefined, count: undefined }
  ])

  function add() {
    setItems(items => [...items, { price: undefined, count: undefined }])
  }

  function clear() {
    setItems([{ price: undefined, count: undefined }])
  }

  function onChange(index: number, column: 'price' | 'count', value: number) {
    setItems(items => items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [column]: value
        }
      } else {
        return item
      }
    }))
  }

  const rows = useMemo(() => {
    return items.map((item, i) => (
      <Table.Tr key={i}>
        <Table.Td>
          <NumberInput variant="filled" value={item.price} onChange={(value) => onChange(i, 'price', Number(value))} size="md" />
        </Table.Td>
        <Table.Td>
          <NumberInput variant="filled" value={item.count} onChange={(value) => onChange(i, 'count', Number(value))} size="md" />
        </Table.Td>
        <Table.Td>
          <Text>
            {(Number.isNaN((item.price ?? 0) / (item.count ?? 0)) ? 0 : ((item.price ?? 0) / (item.count ?? 0))).toFixed(2)}
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
