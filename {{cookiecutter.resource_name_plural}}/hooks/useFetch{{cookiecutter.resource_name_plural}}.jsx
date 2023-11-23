import { useEffect, useState } from 'react'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import config from 'config'
import { {{cookiecutter.resource_name_singular|lower}}FromAPI } from '../transformers'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import RetryButtonSnackbar from 'components/RetryButtonSnackbar'

export default function useFetch{{cookiecutter.resource_name_plural}}(filters) {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [{{cookiecutter.resource_name_plural|lower}}, set{{cookiecutter.resource_name_plural}}] = useState(null)
  const { doFetch, response, paginator, loading, error, retry } = usePaginatedFetch({
    url: `${config.api.ms{{cookiecutter.resource_name_plural}}.baseUrl}/{{cookiecutter.resource_name_plural|lower}}`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const {{cookiecutter.resource_name_plural|lower}} = response.data.map(({{cookiecutter.resource_name_singular|lower}}) => {{cookiecutter.resource_name_singular|lower}}FromAPI({{cookiecutter.resource_name_singular|lower}}, t))

    set{{cookiecutter.resource_name_plural}}({{cookiecutter.resource_name_plural|lower}})
  }, [response, t])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      maxSnack: 1,
      action: (
        <RetryButtonSnackbar
          onClick={() => {
            doFetch()
            closeSnackbar()
          }}
          label={t('retry')}
        />
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, t])

  return { {{cookiecutter.resource_name_plural|lower}}, paginator, loading, error, refresh: retry }
}
