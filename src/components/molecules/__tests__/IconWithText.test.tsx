import { render, screen } from '@testing-library/react'
import { IconWithText } from '../IconWithText'
import { MantineProvider } from '@mantine/core'

// Mantineプロバイダーでラップするヘルパー関数
const renderWithMantine = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  )
}

describe('IconWithText', () => {
  it('should render text with icon', () => {
    renderWithMantine(<IconWithText icon="home" text="テストテキスト" />)
    expect(screen.getByText('テストテキスト')).toBeInTheDocument()
  })

  it('should not render when text is null', () => {
    const { container } = renderWithMantine(<IconWithText icon="home" text={null} />)
    expect(container.querySelector('[class*="mantine-Flex"]')).toBeNull()
  })

  it('should not render when text is undefined', () => {
    const { container } = renderWithMantine(<IconWithText icon="home" text={undefined} />)
    expect(container.querySelector('[class*="mantine-Flex"]')).toBeNull()
  })

  it('should not render when text is empty string', () => {
    const { container } = renderWithMantine(<IconWithText icon="home" text="" />)
    expect(container.querySelector('[class*="mantine-Flex"]')).toBeNull()
  })

  it('should render with right icon when rightIcon is true', () => {
    renderWithMantine(<IconWithText icon="home" text="テスト" rightIcon />)
    expect(screen.getByText('テスト')).toBeInTheDocument()
  })

  it('should handle text correctly', () => {
    renderWithMantine(<IconWithText icon="home" text="チーム1,チーム2" />)
    expect(screen.getByText('チーム1,チーム2')).toBeInTheDocument()
  })

  it('should render flex container for valid text', () => {
    const { container } = renderWithMantine(<IconWithText icon="home" text="テスト" />)
    expect(container.querySelector('[class*="mantine-Flex"]')).toBeInTheDocument()
  })

  it('should render all icon types without error', () => {
    const iconTypes = ['home', 'mapPin', 'star', 'users', 'arrowLeft', 'chevronLeft', 'chevronRight'] as const
    
    iconTypes.forEach(iconType => {
      const { unmount } = renderWithMantine(<IconWithText icon={iconType} text="テスト" />)
      expect(screen.getByText('テスト')).toBeInTheDocument()
      unmount()
    })
  })
})