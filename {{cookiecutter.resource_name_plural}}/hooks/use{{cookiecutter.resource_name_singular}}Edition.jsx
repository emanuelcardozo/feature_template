import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import config from 'config'
import RetryButtonSnackbar from 'components/RetryButtonSnackbar'
import { useNavigate } from 'react-router-dom'

export default function use{{cookiecutter.resource_name_singular}}Edition(id) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { response, doFetch, loading, error } = useFetch(
    `${config.api.ms{{cookiecutter.resource_name_plural}}.baseUrl}/{{cookiecutter.resource_name_plural|lower}}/${id}`,
    {
      method: 'PATCH',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data) => {
      doFetch({ data })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    navigate('/{{cookiecutter.resource_name_plural|lower}}')

    const message = t('editedSuccessfully', {
      name: response.data.name,
      type: t('features:{{cookiecutter.resource_name_plural}}:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return { onSubmit, loading }
}
