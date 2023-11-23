import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Card,
  Container,
  Stack,
  List,
  ListItem,
  ListItemText,
  CardHeader,
  CardContent,
} from '@mui/material'
import SectionBackButton from 'components/SectionBackButton'
import LoadingValue from 'components/LoadingValue'
import useFetch{{cookiecutter.resource_name_singular}}Detail from '../hooks/useFetch{{cookiecutter.resource_name_singular}}Detail'

const BASIC_DETAILS_FIELDS = [
  {% for field in cookiecutter.__fields %}
    "{{field.name}}",
  {% endfor %}
]
const style = { width: '100%', maxWidth: 360, bgcolor: 'background.paper' }

export default function {{cookiecutter.resource_name_singular}}Detail() {
  const { id } = useParams()
  const { t } = useTranslation('features', { keyPrefix: '{{cookiecutter.resource_name_plural}}' })
  const { {{cookiecutter.resource_name_singular|lower}}, loading } = useFetch{{cookiecutter.resource_name_singular}}Detail(id)
  const isLoading = loading || {{cookiecutter.resource_name_singular|lower}} === null

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <SectionBackButton label={t('listing.title')} to="/{{cookiecutter.resource_name_plural|lower}}" />
        <Card>
          <CardHeader title={t('details.details')} />
          <CardContent pt={0}>
            <List sx={style}>
              {BASIC_DETAILS_FIELDS.map((fieldName) => (
                <ListItem key={fieldName} disableGutters>
                  <ListItemText
                    primary={t(`fields.${fieldName}`)}
                    secondary={<LoadingValue loading={isLoading} value={({{cookiecutter.resource_name_singular|lower}})?.[fieldName]} />}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
