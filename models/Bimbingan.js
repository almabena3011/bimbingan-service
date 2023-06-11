const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    class Bimbingan extends Model {
        static associate(models) {
            this.hasMany(models.ProgressMingguan, { as: 'progressMingguan' });

        }
    }
    Bimbingan.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            mahasiswa_mbkm_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dosenId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            laporan_akhir_path: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            isBimbinganFinished: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
            modelName: 'Bimbingan',
            tableName: 'bimbingan',
            timestamps: true,
        }
    );

    return Bimbingan;
};




