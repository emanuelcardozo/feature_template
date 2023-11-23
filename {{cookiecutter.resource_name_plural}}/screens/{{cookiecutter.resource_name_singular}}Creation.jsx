import { Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SectionBackButton from 'components/SectionBackButton'
import {{cookiecutter.resource_name_singular}}Form from '../components/{{cookiecutter.resource_name_singular}}Form'
import use{{cookiecutter.resource_name_singular}}FormCancelDialog from '../hooks/use{{cookiecutter.resource_name_singular}}FormCancelDialog'
import use{{cookiecutter.resource_name_singular}}Creation from '../hooks/use{{cookiecutter.resource_name_singular}}Creation'

const direction = { md: 'row', xs: 'column' }
const style = { alignItems: 'center' }

export default function {{cookiecutter.resource_name_singular}}Creation() {
  const { t } = useTranslation('features', { keyPrefix: '{{cookiecutter.resource_name_plural}}' })
  const { onClickOpenConfirm } = use{{cookiecutter.resource_name_singular}}FormCancelDialog()
  const { onSubmit, loading } = use{{cookiecutter.resource_name_singular}}Creation()

  return (
    <Container maxWidth="xl">
      <Stack spacing={3} my={3}>
        <SectionBackButton label={t('listing.title')} to="/{{cookiecutter.resource_name_plural}}" />
        <Stack
          direction={direction}
          justifyContent="space-between"
          spacing={4}
          alignItems="flex-start"
        >
          <Stack direction="row" spacing={2} sx={style}>
            <Typography variant="h4">{t('create.title')}</Typography>
          </Stack>
        </Stack>
        <{{cookiecutter.resource_name_singular}}Form onSubmit={onSubmit} isSubmitting={loading} onCancel={onClickOpenConfirm} />
      </Stack>
    </Container>
  )
}
