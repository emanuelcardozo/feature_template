import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Table from 'components/Table'
import withActions from 'components/Table/components/withActions'
import withPagination from 'components/Table/components/withPagination'
import withSortHeaders from 'components/Table/components/withSortHeader'
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon'
import PencilIcon from '@heroicons/react/24/solid/PencilIcon'
import TrashIcon from '@heroicons/react/24/solid/TrashIcon'
// import withMultiSelect from 'components/Table/components/withMultiSelect'

const PaginatedTable = withPagination(Table)
const SortableTable = withSortHeaders(PaginatedTable)
// const SelectableTable = withMultiSelect(SortableTable)
const TableWithActions = withActions(SortableTable)

const {{cookiecutter.resource_name_plural}}Table = ({ onClickView, onClickEdit, onClickRemove, ...restOfProps }) => {
  const { t } = useTranslation('common')
  const actions = useMemo(
    () => [
      {
        label: t('edit'),
        icon: PencilIcon,
        onClick: onClickEdit,
      },
      {
        label: t('view'),
        icon: ArrowRightIcon,
        onClick: onClickView,
      },
      {
        label: t('delete'),
        icon: TrashIcon,
        onClick: onClickRemove,
      },
    ],
    [t, onClickView, onClickEdit, onClickRemove]
  )

  return <TableWithActions {...restOfProps} actions={actions} />
}

{{cookiecutter.resource_name_plural}}Table.propTypes = {
  onClickView: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
}

export default {{cookiecutter.resource_name_plural}}Table
