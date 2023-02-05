import useSWR from 'swr'

export interface StudentDetailProps {
  studentId: any
}

const MILISECOND_PER_HOUR = 60 * 60 * 1000

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: MILISECOND_PER_HOUR,
  })

  function handleMutateClick() {
    mutate({ name: 'Easy Frontend ' }, true)
  }

  return (
    <div>
      Name: {data?.name || '--'} <button onClick={handleMutateClick}>Mutate</button>
    </div>
  )
}
