import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import { MantineProvider, Grid } from '@mantine/core'

// Mantineプロバイダーでラップするヘルパー関数
const renderWithMantine = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      <Grid>
        {component}
      </Grid>
    </MantineProvider>
  )
}

// IconWithTextコンポーネントのモック
jest.mock('../IconWithText', () => ({
  IconWithText: ({ text }: { text: string | string[] | null }) => {
    if (!text) return null
    if (Array.isArray(text)) {
      return <div>{text.length === 0 ? 'チーム情報なし' : text.join(', ')}</div>
    }
    return <div data-testid="icon-with-text">{text}</div>
  }
}))

// Imageコンポーネントのモック
jest.mock('@/components/atoms/Image', () => ({
  Image: ({ alt }: { alt: string }) => <img alt={alt} />
}))

describe('Card', () => {
  const defaultProps = {
    id: 1,
    name: 'テストスタジアム',
    homeTeams: ['FC東京', '東京ヴェルディ'],
    capacity: BigInt(50000),
    access: '東京駅から徒歩10分',
    imageUrl: null
  }

  it('should render stadium name', () => {
    renderWithMantine(<Card {...defaultProps} />)
    expect(screen.getByText('テストスタジアム')).toBeInTheDocument()
  })

  it('should render capacity when provided', () => {
    renderWithMantine(<Card {...defaultProps} />)
    expect(screen.getByText('50,000人')).toBeInTheDocument()
  })

  it('should render access information', () => {
    renderWithMantine(<Card {...defaultProps} />)
    expect(screen.getByText('東京駅から徒歩10分')).toBeInTheDocument()
  })

  it('should render home teams', () => {
    renderWithMantine(<Card {...defaultProps} />)
    expect(screen.getByText('FC東京, 東京ヴェルディ')).toBeInTheDocument()
  })

  it('should not render capacity section when capacity is null', () => {
    const props = { ...defaultProps, capacity: null }
    renderWithMantine(<Card {...props} />)
    expect(screen.queryByText(/人$/)).not.toBeInTheDocument()
  })

  it('should render "チーム情報なし" when homeTeams is empty', () => {
    const props = { ...defaultProps, homeTeams: [] }
    renderWithMantine(<Card {...props} />)
    expect(screen.getByText('チーム情報なし')).toBeInTheDocument()
  })

  it('should render clickable link to stadium detail', () => {
    renderWithMantine(<Card {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/stadiums/1')
  })

  it('should render name when provided', () => {
    renderWithMantine(<Card {...defaultProps} />)
    expect(screen.getByText('テストスタジアム')).toBeInTheDocument()
  })

  it('should handle null name gracefully', () => {
    const props = { ...defaultProps, name: null }
    renderWithMantine(<Card {...props} />)
    // nameがnullの場合、h3要素は存在するが内容は空
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
  })
})