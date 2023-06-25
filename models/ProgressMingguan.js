const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class ProgressMingguan extends Model {
        static associate(models) {
            this.belongsTo(models.Bimbingan, { foreignKey: 'bimbinganId' });
        }
    }
    ProgressMingguan.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            bimbinganId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            progress_laporan: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            is_submitted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            feedback_laporan: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            startWeek: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endWeek: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'ProgressMingguan',
            tableName: 'progress_mingguan',
            timestamps: true,
        }
    );

    return ProgressMingguan;
};




