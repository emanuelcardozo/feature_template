import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import config from 'src/config.js'
import useFetch from 'hooks/useFetch.js'

export default function use{{cookiecutter.resource_name_singular}}ConfirmDialog(refresh) {
  const { t } = useTranslation('features', { keyPrefix: '{{cookiecutter.resource_name_plural}}' })
  const confirm = useConfirm()
  const { doFetch } = useFetch()

  const onClickOpenConfirm = useCallback(
    ({{cookiecutter.resource_name_singular|lower}}) => {
      const action = {{cookiecutter.resource_name_singular|lower}}?.hidden ? 'unhide' : 'hide'

      confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.cancel'),
      })
        .then(() => {
          doFetch({
            method: 'PATCH',
            url: `${config.api.ms{{cookiecutter.resource_name_plural}}.baseUrl}/{{cookiecutter.resource_name_plural|lower}}/${ {{cookiecutter.resource_name_singular|lower}}.id }`,
            data: {
              active: {{cookiecutter.resource_name_singular|lower}}?.hidden,
            },
          }).then(refresh)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, confirm, refresh]
  )

  return { onClickOpenConfirm }
}
