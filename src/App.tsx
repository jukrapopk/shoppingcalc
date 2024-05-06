import { ActionIcon, Button, Card, Center, Group, NumberInput, Stack, Table, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconArrowsDoubleSwNe } from '@tabler/icons-react';
import { useMemo } from 'react';
import { getMaxIndex, getMinIndex } from './helper';

interface Item {
  price: number | undefined,
  count: number | undefined,
  per: number | undefined
}

const defaultItem: Item = { price: undefined, count: undefined, per: undefined }

function App() {
  const [items, setItems] = useLocalStorage<Item[]>({ key: 'items', defaultValue: [{ ...defaultItem }] })

  function add() {
    setItems(items => [...items, { ...defaultItem }])
  }

  function clear() {
    setItems([{ ...defaultItem }])
  }

  const minIndex = useMemo(() => {
    return getMinIndex(items.map(item => item.per ?? Infinity))
  }, [items])


  const maxIndex = useMemo(() => {
    return getMaxIndex(items.map(item => item.per ?? 0))
  }, [items])

  const shouldShowIndicator = useMemo(() => {
    let completeEntry = 0;
    items.forEach(item => {
      if (item.per !== undefined) {
        completeEntry++
      }
    })
    return completeEntry > 1
  }, [items])

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

  const [inverted, setInverted] = useLocalStorage({ key: 'inverted', defaultValue: false });

  const rows = useMemo(() => {
    return items.map((item, i) => (
      <Table.Tr key={i} bg={shouldShowIndicator ? (minIndex === i ? "green.3" : maxIndex === i ? "red.4" : "none") : "none"}>
        <Table.Td>
          <NumberInput inputMode="decimal" variant="filled" value={item.price ?? ''} onChange={(value) => onChange(i, 'price', value ? Number(value) : undefined)} size="md" hideControls />
        </Table.Td>
        <Table.Td>
          <NumberInput inputMode="decimal" variant="filled" value={item.count ?? ''} onChange={(value) => onChange(i, 'count', value ? Number(value) : undefined)} size="md" hideControls />
        </Table.Td>
        <Table.Td>
          <Text>
            {item.per ? Number(inverted ? 1 / item.per : item.per).toFixed(2) : '-'}
          </Text>
        </Table.Td>
      </Table.Tr>
    ))
  }, [items, minIndex, maxIndex, shouldShowIndicator, inverted])

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
                <Table.Th>
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" fw="bold">
                      {inverted ?
                        "Unit / Price"
                        :
                        "Price / Unit"
                      }
                    </Text>
                    <Group gap={2}>
                      <ActionIcon variant="transparent" size="xs" color="gray" onClick={() => setInverted(inverted => !inverted)}>
                        <IconArrowsDoubleSwNe />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Table.Th>
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
