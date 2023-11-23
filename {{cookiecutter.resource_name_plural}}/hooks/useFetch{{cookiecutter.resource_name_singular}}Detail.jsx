import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import config from 'config'
import RetryButtonSnackbar from 'components/RetryButtonSnackbar'
import { {{cookiecutter.resource_name_singular|lower}}FromAPI } from '../transformers'

export default function useFetch{{cookiecutter.resource_name_singular}}Detail(id) {
  const [{{cookiecutter.resource_name_singular|lower}}, set{{cookiecutter.resource_name_singular}}] = useState()
  const { t } = useTranslation('common')
  const { response, doFetch, loading, error } = useFetch(
    `${config.api.ms{{cookiecutter.resource_name_plural}}.baseUrl}/{{cookiecutter.resource_name_plural|lower}}/${id}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!response) return

    set{{cookiecutter.resource_name_singular}}({{cookiecutter.resource_name_singular|lower}}FromAPI(response.data, t))
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

  return { {{cookiecutter.resource_name_singular|lower}}, loading, error }
}
