import { Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SectionBackButton from 'components/SectionBackButton'
import {{cookiecutter.resource_name_singular}}Form from '../components/{{cookiecutter.resource_name_singular}}Form'
import use{{cookiecutter.resource_name_singular}}Edition from '../hooks/use{{cookiecutter.resource_name_singular}}Edition'
import { useParams } from 'react-router-dom'
import useFetch{{cookiecutter.resource_name_singular}}Detail from '../hooks/useFetch{{cookiecutter.resource_name_singular}}Detail'
import { edition{{cookiecutter.resource_name_singular}}FromAPI } from '../transformers'
import use{{cookiecutter.resource_name_singular}}FormCancelDialog from '../hooks/use{{cookiecutter.resource_name_singular}}FormCancelDialog'

const direction = { md: 'row', xs: 'column' }

export default function {{cookiecutter.resource_name_singular}}Edition() {
  const { t } = useTranslation('features', { keyPrefix: '{{cookiecutter.resource_name_plural}}' })
  const { id } = useParams()
  const { onClickOpenConfirm } = use{{cookiecutter.resource_name_singular}}FormCancelDialog({ mode: 'edit' })
  const { {{cookiecutter.resource_name_singular|lower}}, loading } = useFetch{{cookiecutter.resource_name_singular}}Detail(id, edition{{cookiecutter.resource_name_singular}}FromAPI)
  const { onSubmit, loading: isSubmitting } = use{{cookiecutter.resource_name_singular}}Edition(id)

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
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h4">{t('edit.title')}</Typography>
          </Stack>
        </Stack>
        <{{cookiecutter.resource_name_singular}}Form
          onSubmit={onSubmit}
          initialValues={ {{cookiecutter.resource_name_singular|lower}} }
          mode="edit"
          isLoading={loading}
          isSubmitting={isSubmitting}
          onCancel={onClickOpenConfirm}
        />
      </Stack>
    </Container>
  )
}
